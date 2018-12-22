import i18n from 'i18next';
// import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
//   .use(XHR)
//    .use(LanguageDetector)
    .use(reactI18nextModule) // if not using I18nextProvider
    .init({
        fallbackLng: 'pt-BR',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: false,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default'
        },

        resources: {
            'en': {
                login: {
                    "new-user": "Create a new account",
                    "access-with-o-auth": "Access with your social account",
                    "registered-user": "I already have an account",
                    "full-name": "Full name",
                    "email": "E-mail",
                    "password": "Password",
                    "create": "Create",
                    'access': 'Access'
                }
            },
            'pt-BR': {
                login: {
                    "login-title": "Identifique-se!!",
                    "access-with-o-auth": "Acesse com a sua rede social",
                    "registered-user": "Já tenho uma conta",
                    "full-name": "Nome completo",
                    'create-account': 'Criar conta',
                    "email": "E-mail",
                    "password": "Senha",
                    "create": 'Criar',
                    'access': 'Acessar',
                    'forgot-password': 'Esqueci a senha',
                    'auth/user-not-found': "Login não encontrado",
                    'auth/email-required': "Email obrigatório",
                    'auth/password-required': "Password obrigatório",
                    'auth/invalid-email': "Email inválido",
                    'auth/weak-password': "Coloque uma senha mais forte. Utilize números e letras e coloque uma senha com mais de 6 dígitos",
                    'auth/api-error': "Erro ao fazer o login!",
                    'email-reset-sent': "Email para redefinição de senha enviado.",
                    'email-required-for-reset': "Preencha o campo de email para redefinir a senha.",
                },
                menu: {
                    'logout': 'Sair',
                    'ranking': 'Ranking'
                },
                ranking: {
                    'ranking': 'Top 10',
                    'picture': "Avatar",
                    'position': "Posição",
                    'name': "Nome",
                    'email': "E-mail",
                    'team': 'Time',
                    'score': "Pontos",
                    'experience': "XP",
                }
            }
        }
    });


export default i18n;