<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'csrf-token'], 
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173',
    'https://task-manager-laravel.netlify.app/'], 
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, 
];
