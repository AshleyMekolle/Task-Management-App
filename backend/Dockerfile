# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Update and install necessary packages
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Install PHP extensions (Include PostgreSQL extension)
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files (COPY only the necessary files, not all files, to avoid unnecessary cache invalidation)
COPY backend/ /var/www/html/

# Set correct permissions for the storage and cache directories
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies and other necessary steps
RUN composer install --no-interaction --no-dev --prefer-dist

# Install npm dependencies and build frontend
RUN npm install
RUN npm run build

# Setup Laravel application environment
RUN cp .env.example .env
RUN php artisan key:generate

# Configure Apache to serve from the "public" directory
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
