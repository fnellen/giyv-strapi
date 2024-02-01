import fs from 'fs';
import path from 'path';

let serviceAccount;
const jsonFilePath = path.resolve('google_bucketservice_account.json');

if (fs.existsSync(jsonFilePath)) {
    const rawData = fs.readFileSync(jsonFilePath, 'utf8');
    serviceAccount = JSON.parse(rawData);
} else {
    serviceAccount = undefined;
}

export default ({ env }) => ({
    seo: {
        enabled: true,
    },
    attributes: {
        title: {
            type: 'string',
            required: true,
        },
        uuid: {
            type: "customField",
            customField: "plugin::field-uuid.uuid"
        },
    },
    "local-image-sharp": {
        config: {
            cacheDir: ".image-cache",
            maxAge: 31536000
        },
    },
    email: {
        config: {
            provider: 'strapi-provider-email-resend',
            providerOptions: {
                apiKey: env('RESEND_EMAIL_API_TOKEN'),
            },
            settings: {
                defaultFrom: 'German-Italian Young Voices<hello@giyv.eu>',
                defaultReplyTo: 'German-Italian Young Voices<hello@giyv.eu>',
            },
        }
    },
    upload: {
        config: {
            provider:
                "@strapi-community/strapi-provider-upload-google-cloud-storage",
            providerOptions: {
                bucketName: env("BUCKET_NAME"),
                baseUrl: `https://storage.googleapis.com/${env("BUCKET_NAME")}`,
                publicFiles: true,
                uniform: true,
                basePath: "",
                serviceAccount: serviceAccount,
            },
        },
    },
    ezforms: {
        config: {
            captchaProvider: {
                name: 'recaptcha',
                config: {
                    secretKey: env('RECAPTCHA_SECRET_KEY'),
                    minimumScore: 0.5
                }
            },
            notificationProviders: [{
                name: 'email',
                enabled: true,
                config: {
                    subject: "Contact form submitted", // Optional
                    from: 'noreply@giyv.eu' // Required
                }
            },]
        }
    }
});