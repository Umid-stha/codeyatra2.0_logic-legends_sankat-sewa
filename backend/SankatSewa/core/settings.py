from pathlib import Path
from decouple import config
from datetime import timedelta
from .pagination import CustomPagination

# Build paths inside the project like this: BASE_DIR / 'subdir'.

BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=0, cast=bool) 

ALLOWED_HOSTS = config("ALLOWED_HOSTS").split()

SITE_ID = 1

WEBSITE_URL = config("WEBSITE_URL")

#Auth configs

#Use this to add any addition fields for users
# AUTH_USER_MODEL = 'useraccount.CustomUser'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME' : timedelta(minutes=10), 
    'REFRESH_TOKEN_LIFETIME' : timedelta(days=7),
    'ROTATE_REFRESH_TOKEN' : False,
    'BLACKLIST_AFTER_ROTATION' : False,
    'UPDATE_LAST_LOGIN' : True,
    'SIGNING_KEY' : config("JWT_SIGNING_KEY"),
    'ALGORITHM': 'HS512',
}

ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_USERNAME_REQUIRED = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # <-- default
    ],
    'DEFAULT_PAGINATION_CLASS': CustomPagination
}

REST_AUTH = {
    'USE_JWT' : True,
    'JWT_AUTH_REFRESH_COOKIE': 'jwt-refresh', # Name of the cookie for the refresh token
    'JWT_AUTH_HTTPONLY': True, # Set to True to make the cookies HttpOnly
    'JWT_AUTH_SAMESITE': 'Lax', # Optional: Set SameSite attribute for cookies
    # 'USER_DETAILS_SERIALIZER': 'useraccount.serializers.CustomUserDetailsSerializer', Use incase any new fields added to user model
    'JWT_AUTH_SECURE': False,
}

#CORS Config
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS").split()
CORS_TRUSTED_ORIGINS= ['http://localhost:5173', 'http://192.168.1.99:5173/' ]
CORS_ALLOW_ALL_ORIGINS = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',

    'allauth',
    'allauth.account',

    'dj_rest_auth',
    'dj_rest_auth.registration',
    
    'corsheaders',

    'useraccount'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'