# Use an official PHP runtime with Apache
FROM php:8.2-apache

# Set working directory to the backend folder
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set environment to allow superuser for Composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Copy only the backend folder contents
COPY backend/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Update Composer dependencies
RUN composer self-update
RUN composer update --no-interaction

# Install Composer dependencies
RUN composer install --no-interaction --no-plugins --no-scripts

# Install npm dependencies and build
RUN npm install
RUN npm run build

# Generate application key
RUN cp .env.example .env
RUN php artisan key:generate

# Configure Apache
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]