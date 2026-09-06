from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "E-Commerce Platform API"
    app_env: str = "development"

    database_host: str = "localhost"
    database_port: int = 5432
    database_name: str = "ecommerce"
    database_user: str = "ecommerce"
    database_password: str = ""

    secret_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
