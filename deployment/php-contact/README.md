# PHP Contact Endpoint

This folder contains a standalone `contact.php` endpoint you can upload to a PHP-enabled server such as `https://gdz.pl/contact.php`.

## What it does

- accepts `POST` requests from your frontend form
- validates `name`, `email`, and `phone`
- optionally accepts `message`
- checks the request `Origin` against an allowlist
- responds with JSON
- sends the email over SMTP using the credentials you configure
- includes a honeypot field and a basic IP rate limit

## Before deploying

Update the constants at the top of [c.php](/Users/ms/Web/modena-app/deployment/php-contact/c.php):

- `ALLOWED_ORIGINS`
- `ALLOW_EMPTY_ORIGIN`
- `CONTACT_RECIPIENTS`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`
- `CONTACT_SUBJECT`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_ENCRYPTION`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`

## Expected frontend fields

Send either `FormData` or JSON with:

- `name`
- `email`
- `phone`
- `message`
- `website`

`website` is the honeypot field and should stay empty.

## Recommended frontend approach

Use `fetch('https://gdz.pl/contact.php', { method: 'POST', body: formData })`.

Using `FormData` keeps the request simple and avoids a CORS preflight in many cases.

## Response shape

Success:

```json
{
  "ok": true,
  "message": "Message sent."
}
```

Validation error:

```json
{
  "ok": false,
  "message": "Please correct the highlighted fields.",
  "errors": {
    "email": "Email address is invalid."
  }
}
```

## Quick deployment test

After you upload the script, test it with:

```bash
curl -i -X OPTIONS https://gdz.pl/contact.php \
  -H "Origin: https://your-frontend-domain.example"
```

Then submit a real request:

```bash
curl -i -X POST https://gdz.pl/contact.php \
  -H "Origin: https://your-frontend-domain.example" \
  -F "name=Jan Kowalski" \
  -F "email=jan@example.com" \
  -F "phone=123456789" \
  -F "message=Test from curl" \
  -F "website="
```
