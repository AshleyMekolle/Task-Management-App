<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'csrf-token'], // Add 'csrf-token' here
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Add your frontend URL here
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Enable credentials (cookies, authorization headers)
];
