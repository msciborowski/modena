<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Contact endpoint configuration
|--------------------------------------------------------------------------
|
| Update these values before deploying the script to your PHP server.
|
*/

const ALLOWED_ORIGINS = [
    'https://example.com',
];

const ALLOW_EMPTY_ORIGIN = false;
const CONTACT_RECIPIENT = 'sales@example.com';
const CONTACT_FROM_EMAIL = 'noreply@example.com';
const CONTACT_FROM_NAME = 'Modena Contact Form';
const CONTACT_SUBJECT = 'Nowe zapytanie z formularza Modena';

const SMTP_HOST = 'smtp.example.com';
const SMTP_PORT = 587;
const SMTP_ENCRYPTION = 'tls'; // allowed: 'tls', 'ssl', 'none'
const SMTP_USERNAME = 'smtp-user@example.com';
const SMTP_PASSWORD = 'replace-with-your-password';
const SMTP_TIMEOUT_SECONDS = 15;

const RATE_LIMIT_WINDOW_SECONDS = 900;
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const HONEYPOT_FIELD = 'website';
const MAX_FIELD_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 4000;

header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$origin = getRequestOrigin();
$originAllowed = isOriginAllowed($origin);

if ($originAllowed && $origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (!$originAllowed) {
        sendJson(403, ['ok' => false, 'message' => 'Origin not allowed.']);
    }

    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

if (!$originAllowed) {
    sendJson(403, ['ok' => false, 'message' => 'Origin not allowed.']);
}

if (isRateLimited(getClientIpAddress())) {
    sendJson(429, ['ok' => false, 'message' => 'Too many requests. Please try again later.']);
}

$payload = getRequestPayload();

if (!is_array($payload)) {
    sendJson(400, ['ok' => false, 'message' => 'Invalid request payload.']);
}

if (!empty(trim((string) ($payload[HONEYPOT_FIELD] ?? '')))) {
    sendJson(200, ['ok' => true, 'message' => 'Message sent.']);
}

$name = limitLength(normalizeText($payload['name'] ?? ''), MAX_FIELD_LENGTH);
$email = limitLength(normalizeText($payload['email'] ?? ''), MAX_FIELD_LENGTH);
$phone = limitLength(normalizeText($payload['phone'] ?? ''), MAX_FIELD_LENGTH);
$message = limitLength(normalizeMultilineText($payload['message'] ?? ''), MAX_MESSAGE_LENGTH);

$validationErrors = validatePayload($name, $email, $phone, $message);

if ($validationErrors !== []) {
    sendJson(422, [
        'ok' => false,
        'message' => 'Please correct the highlighted fields.',
        'errors' => $validationErrors,
    ]);
}

$emailBody = buildEmailBody($name, $email, $phone, $message, $origin);
$replyToName = sanitizeHeaderValue($name);
$replyToEmail = sanitizeHeaderValue($email);

try {
    smtpSendMail([
        'host' => SMTP_HOST,
        'port' => SMTP_PORT,
        'encryption' => SMTP_ENCRYPTION,
        'username' => SMTP_USERNAME,
        'password' => SMTP_PASSWORD,
        'timeout' => SMTP_TIMEOUT_SECONDS,
        'fromEmail' => CONTACT_FROM_EMAIL,
        'fromName' => CONTACT_FROM_NAME,
        'toEmail' => CONTACT_RECIPIENT,
        'subject' => CONTACT_SUBJECT,
        'replyToEmail' => $replyToEmail,
        'replyToName' => $replyToName,
        'body' => $emailBody,
    ]);
} catch (RuntimeException $exception) {
    error_log('Contact form SMTP error: ' . $exception->getMessage());
    sendJson(500, ['ok' => false, 'message' => 'Could not send the message right now.']);
}

sendJson(200, ['ok' => true, 'message' => 'Message sent.']);

function getRequestOrigin(): string
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (!is_string($origin)) {
        return '';
    }

    return trim($origin);
}

function isOriginAllowed(string $origin): bool
{
    if ($origin === '') {
        return ALLOW_EMPTY_ORIGIN;
    }

    return in_array($origin, ALLOWED_ORIGINS, true);
}

function getClientIpAddress(): string
{
    $forwardedFor = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';

    if (is_string($forwardedFor) && $forwardedFor !== '') {
        $parts = explode(',', $forwardedFor);
        $candidate = trim($parts[0]);

        if ($candidate !== '') {
            return $candidate;
        }
    }

    $remoteAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    return is_string($remoteAddress) && $remoteAddress !== '' ? $remoteAddress : 'unknown';
}

function isRateLimited(string $clientIp): bool
{
    $storageKey = hash('sha256', $clientIp);
    $storagePath = sys_get_temp_dir() . '/contact_rate_limit_' . $storageKey . '.json';
    $currentTime = time();
    $timestamps = [];

    if (is_file($storagePath)) {
        $contents = file_get_contents($storagePath);

        if (is_string($contents) && $contents !== '') {
            $decoded = json_decode($contents, true);

            if (is_array($decoded)) {
                $timestamps = array_values(array_filter($decoded, static fn ($timestamp): bool => is_int($timestamp)));
            }
        }
    }

    $recentTimestamps = array_values(
        array_filter(
            $timestamps,
            static fn (int $timestamp): bool => ($currentTime - $timestamp) < RATE_LIMIT_WINDOW_SECONDS
        )
    );

    $recentTimestamps[] = $currentTime;
    file_put_contents($storagePath, json_encode($recentTimestamps), LOCK_EX);

    return count($recentTimestamps) > RATE_LIMIT_MAX_ATTEMPTS;
}

function getRequestPayload(): array|null
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (is_string($contentType) && str_contains($contentType, 'application/json')) {
        $input = file_get_contents('php://input');

        if (!is_string($input) || $input === '') {
            return null;
        }

        $decoded = json_decode($input, true);

        return is_array($decoded) ? $decoded : null;
    }

    return $_POST;
}

function normalizeText(mixed $value): string
{
    $text = is_scalar($value) ? (string) $value : '';

    return trim(preg_replace('/\s+/u', ' ', $text) ?? '');
}

function normalizeMultilineText(mixed $value): string
{
    $text = is_scalar($value) ? (string) $value : '';
    $text = str_replace(["\r\n", "\r"], "\n", $text);
    $text = preg_replace("/\n{3,}/u", "\n\n", $text) ?? '';

    return trim($text);
}

function limitLength(string $value, int $limit): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $limit);
    }

    return substr($value, 0, $limit);
}

function validatePayload(string $name, string $email, string $phone, string $message): array
{
    $errors = [];

    if ($name === '') {
        $errors['name'] = 'Name is required.';
    }

    if ($email === '') {
        $errors['email'] = 'Email is required.';
    } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $errors['email'] = 'Email address is invalid.';
    }

    if ($phone === '') {
        $errors['phone'] = 'Phone number is required.';
    }

    $messageLength = function_exists('mb_strlen') ? mb_strlen($message) : strlen($message);

    if ($messageLength > MAX_MESSAGE_LENGTH) {
        $errors['message'] = 'Message is too long.';
    }

    return $errors;
}

function buildEmailBody(string $name, string $email, string $phone, string $message, string $origin): string
{
    $lines = [
        'Nowe zapytanie z formularza Modena',
        '',
        'Imie i nazwisko: ' . $name,
        'Email: ' . $email,
        'Telefon: ' . $phone,
        'Origin: ' . ($origin !== '' ? $origin : 'brak'),
        'IP: ' . getClientIpAddress(),
        '',
        'Wiadomosc:',
        $message !== '' ? $message : '(brak)',
    ];

    return implode("\n", $lines);
}

function sanitizeHeaderValue(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function encodeHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function smtpSendMail(array $config): void
{
    $socket = smtpConnect(
        (string) $config['host'],
        (int) $config['port'],
        (string) $config['encryption'],
        (int) $config['timeout']
    );

    try {
        smtpReadResponse($socket, [220]);
        smtpWriteCommand($socket, 'EHLO ' . getSmtpClientName(), [250]);

        if ($config['encryption'] === 'tls') {
            smtpWriteCommand($socket, 'STARTTLS', [220]);

            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Could not enable TLS encryption.');
            }

            smtpWriteCommand($socket, 'EHLO ' . getSmtpClientName(), [250]);
        }

        if ($config['username'] !== '' || $config['password'] !== '') {
            smtpWriteCommand($socket, 'AUTH LOGIN', [334]);
            smtpWriteCommand($socket, base64_encode((string) $config['username']), [334]);
            smtpWriteCommand($socket, base64_encode((string) $config['password']), [235]);
        }

        $fromEmail = sanitizeHeaderValue((string) $config['fromEmail']);
        $toEmail = sanitizeHeaderValue((string) $config['toEmail']);

        smtpWriteCommand($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtpWriteCommand($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtpWriteCommand($socket, 'DATA', [354]);
        smtpWriteData($socket, buildMimeMessage($config), [250]);
        smtpWriteCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function smtpConnect(string $host, int $port, string $encryption, int $timeout)
{
    $transport = $encryption === 'ssl' ? 'ssl://' : '';
    $target = $transport . $host . ':' . $port;
    $errorCode = 0;
    $errorMessage = '';

    $socket = @stream_socket_client($target, $errorCode, $errorMessage, $timeout, STREAM_CLIENT_CONNECT);

    if ($socket === false) {
        throw new RuntimeException('SMTP connection failed: ' . $errorMessage);
    }

    stream_set_timeout($socket, $timeout);

    return $socket;
}

function smtpWriteCommand($socket, string $command, array $expectedCodes): string
{
    $written = fwrite($socket, $command . "\r\n");

    if ($written === false) {
        throw new RuntimeException('Could not write to the SMTP socket.');
    }

    return smtpReadResponse($socket, $expectedCodes);
}

function smtpWriteData($socket, string $data, array $expectedCodes): string
{
    $written = fwrite($socket, $data);

    if ($written === false) {
        throw new RuntimeException('Could not write SMTP message data.');
    }

    return smtpReadResponse($socket, $expectedCodes);
}

function smtpReadResponse($socket, array $expectedCodes): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;

        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    if ($response === '') {
        throw new RuntimeException('Empty response from SMTP server.');
    }

    $code = (int) substr($response, 0, 3);

    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('Unexpected SMTP response [' . $code . ']: ' . trim($response));
    }

    return $response;
}

function buildMimeMessage(array $config): string
{
    $subject = encodeHeader((string) $config['subject']);
    $fromName = encodeHeader(sanitizeHeaderValue((string) $config['fromName']));
    $fromEmail = sanitizeHeaderValue((string) $config['fromEmail']);
    $replyToName = encodeHeader(sanitizeHeaderValue((string) $config['replyToName']));
    $replyToEmail = sanitizeHeaderValue((string) $config['replyToEmail']);
    $toEmail = sanitizeHeaderValue((string) $config['toEmail']);
    $body = dotStuffBody((string) $config['body']);

    $headers = [
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'To: <' . $toEmail . '>',
        'Reply-To: ' . $replyToName . ' <' . $replyToEmail . '>',
        'Subject: ' . $subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    return implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n";
}

function dotStuffBody(string $body): string
{
    $normalizedBody = str_replace(["\r\n", "\r"], "\n", $body);
    $lines = explode("\n", $normalizedBody);

    $escapedLines = array_map(
        static fn (string $line): string => str_starts_with($line, '.') ? '.' . $line : $line,
        $lines
    );

    return implode("\r\n", $escapedLines);
}

function getSmtpClientName(): string
{
    $hostName = gethostname();

    if (!is_string($hostName) || $hostName === '') {
        return 'localhost';
    }

    return $hostName;
}

function sendJson(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
