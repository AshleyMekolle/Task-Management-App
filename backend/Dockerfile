# Use an official PHP image as the base
FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies, including oniguruma for mbstring
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip unzip curl \
    oniguruma-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring

# Copy application files
COPY ./ /var/www/html/

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html

# Expose the port for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
