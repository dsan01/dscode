import { useTranslations } from "@i18n/utils";

export interface BaseEmailProps {
  lang: "es" | "en";
  title: string;
  subtitle?: string;
  body: string;
}

export function BaseEmail({
  lang,
  title,
  subtitle,
  body,
}: BaseEmailProps): string {
  const t = useTranslations(lang);

  return `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
    <!-- Google Fonts: Outfit (Titulos) & Urbanist (Cuerpo) -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Urbanist:wght@400;500;600&display=swap" rel="stylesheet">
    <style type="text/css">
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background-color: #F5F7F9;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .header {
            background: #23A67D;
            background: linear-gradient(110deg, #7CD9B6 0%, #23A67D 46.5%, #105543 100%);
            padding: 35px 35px;
        }
        .body-content {
            padding: 45px 35px 80px 35px;
            font-family: 'Urbanist', Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #111111;
        }
        .signature-box {
            padding: 0 35px 45px 35px;
        }
        .footer {
            background-color: #042F19;
            padding: 20px 35px;
        }
    </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F5F7F9;">
    <center style="width: 100%; background-color: #F5F7F9; padding: 40px 0;">
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container">
            
            <!-- HEADER -->
            <tr>
                <td class="header">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>

                            <td align="left" valign="middle" style="padding-left: 10px;">
                                <h1 style="margin: 0 0 4px 0; font-size: 32px; font-weight: 700; letter-spacing: 0.5px; font-family: 'Outfit', Helvetica, Arial, sans-serif; color: #ffffff;">${title}</h1>
                                ${subtitle ? `<h2 style="margin: 0; font-size: 20px; font-weight: 400; opacity: 0.95; font-family: 'Urbanist', Helvetica, Arial, sans-serif; color: #ffffff;">${subtitle}</h2>` : ""}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <!-- CUERPO DEL CORREO -->
            <tr>
                <td class="body-content">
                    ${body}
                </td>
            </tr>
            
            <!-- FIRMA -->
            <tr>
                <td class="signature-box">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td width="72" align="left" valign="middle">
                                <img src="https://cms.devdscode.com/uploads/Logo_1_7d7f2f544b.png" width="62" alt="Icono" style="display: block; width: 62px; max-width: 100%;">
                            </td>
                            <td width="20" align="center" valign="middle">
                                <div style="border-left: 1px solid #042F19; height: 50px; width: 0px;"></div>
                            </td>
                            <td align="left" valign="middle" style="padding-left: 10px; color: #042F19;">
                                <div style="font-size: 15px; font-weight: 700; font-family: 'Outfit', Helvetica, Arial, sans-serif; margin-bottom: 3px;">David Sanchez Collazos</div>
                                <div style="font-size: 13.5px; font-weight: 400; font-family: 'Urbanist', Helvetica, Arial, sans-serif;">Software Engineer · Full Stack Developer · Project Manager</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <!-- FOOTER -->
            <tr>
                <td class="footer">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <td align="left" valign="middle" style="font-family: 'Urbanist', Helvetica, Arial, sans-serif; font-size: 13px; color: #F0FDF5; font-weight: 400;">
                                ${t("email.base.footer")}
                            </td>
                            <td align="right" valign="middle" width="80">
                                <a href="https://github.com/dsan01" target="_blank" style="text-decoration: none; margin-left: 6px;">
                                    <img src="https://cms.devdscode.com/uploads/brand_github_339b64f747.png" width="30" height="30" alt="GitHub" style="display: inline-block; border: none; vertical-align: middle;">
                                </a>
                                <a href="https://linkedin.com/in/dsanchez01" target="_blank" style="text-decoration: none; margin-left: 6px;">
                                    <img src="https://cms.devdscode.com/uploads/brand_linkedin_a13d4020ad.png" width="30" height="30" alt="LinkedIn" style="display: inline-block; border: none; vertical-align: middle;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
        </table>
    </center>
</body>
</html>`;
}
