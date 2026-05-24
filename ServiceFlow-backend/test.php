<?php
require __DIR__ . '/vendor/autoload.php';

try {
    $client = new Google\Client();
    echo "SUCCESS: Google\Client instantiated\n";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
} catch (Error $e) {
    echo "FATAL ERROR: " . $e->getMessage() . "\n";
}
