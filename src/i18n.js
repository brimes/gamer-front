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
                    "login-title": "Funcional Health Tech!",
                    "access-with-o-auth": "Acesse com a sua rede social",
                    "registered-user": "Já tenho uma conta",
                    "full-name": "Nome completo",
                    'create-account': 'Criar conta',
                    "email": "E-mail",
                    "password": "Senha",
                    "create": 'Criar',
                    'access': 'Acessar',
                    'forgot-password': 'Esqueci a senha',
                    'auth/email-already-in-use': 'Ops, esse email já existe',
                    'confirmation-email-sent': 'Foi enviado um email para confirmação do seu cadastro.',
                    'email-not-confirmed': 'O seu email ainda não foi confirmado. Caso não tenha recebido o email para confirmação, clique no link "Esqueci a senha" para enviar um novo email.',
                    'auth/user-not-found': "Login não encontrado",
                    'auth/email-required': "Email obrigatório",
                    'auth/password-required': "Password obrigatório",
                    'auth/invalid-email': "Email inválido",
                    'auth/weak-password': "Coloque uma senha mais forte. Utilize números e letras e coloque uma senha com mais de 6 dígitos",
                    'auth/wrong-password': 'Ih parece que você digitou algo errado. Se você esqueceu a senha. Clique no link "Lembrar senha" ;)',
                    'auth/api-error': "Erro ao fazer o login!",
                    'email-reset-sent': "Email para redefinição de senha enviado.",
                    'email-required-for-reset': "Preencha o campo de email para redefinir a senha.",
                },
                menu: {
                    'logout': 'Sair',
                    'ranking': 'Ranking',
                    'profile': 'Meu perfil',
                    'configurations': 'Configurações',
                    'users': 'Jogadores',
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
                },
                users: {
                    'users': 'Jogadores',
                    'name': 'Nome',
                    'team': 'Time',
                    'email': 'E-Mail',
                    'role': 'Perfil',
                    'sign-in-provider': 'Tipo de login',
                    'created-at': 'Data de criação',
                }
            }
        }
    });


export default i18n;