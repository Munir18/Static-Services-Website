<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$to = 'mediak997@gmail.com';
$form_type = isset($_POST['form_type']) ? $_POST['form_type'] : 'contact';

// ── CONTACT FORM ──────────────────────────────────────────────
if ($form_type === 'contact') {
    $name    = strip_tags(trim($_POST['name']    ?? ''));
    $email   = filter_var(trim($_POST['email']   ?? ''), FILTER_SANITIZE_EMAIL);
    $company = strip_tags(trim($_POST['company'] ?? ''));
    $budget  = strip_tags(trim($_POST['budget']  ?? ''));
    $service = strip_tags(trim($_POST['service'] ?? ''));
    $message = strip_tags(trim($_POST['message'] ?? ''));

    if (!$name || !$email || !$message) {
        echo json_encode(['success' => false, 'message' => 'Required fields missing']);
        exit;
    }

    $subject = "New Contact Enquiry from $name – Media K9";

    $body  = "NEW CONTACT ENQUIRY\n";
    $body .= "===================\n\n";
    $body .= "Name:    $name\n";
    $body .= "Email:   $email\n";
    $body .= "Company: $company\n";
    $body .= "Budget:  $budget\n";
    $body .= "Service: $service\n\n";
    $body .= "Message:\n$message\n";
}

// ── LAUNCHPAD FORM ────────────────────────────────────────────
elseif ($form_type === 'launchpad') {
    $name  = strip_tags(trim($_POST['name']  ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $brand = strip_tags(trim($_POST['brand'] ?? ''));
    $link  = strip_tags(trim($_POST['link']  ?? ''));
    $sell  = strip_tags(trim($_POST['sell']  ?? ''));
    $why   = strip_tags(trim($_POST['why']   ?? ''));

    if (!$name || !$email || !$brand || !$sell || !$why) {
        echo json_encode(['success' => false, 'message' => 'Required fields missing']);
        exit;
    }

    $subject = "New Launchpad Application from $brand – Media K9";

    $body  = "NEW LAUNCHPAD APPLICATION\n";
    $body .= "=========================\n\n";
    $body .= "Name:              $name\n";
    $body .= "Email:             $email\n";
    $body .= "Brand Name:        $brand\n";
    $body .= "Instagram/Website: $link\n\n";
    $body .= "What they sell:\n$sell\n\n";
    $body .= "Why they should be selected:\n$why\n";
} else {
    echo json_encode(['success' => false, 'message' => 'Unknown form type']);
    exit;
}

// ── SEND MAIL ─────────────────────────────────────────────────
$headers  = "From: noreply@mediak9.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail server error. Please try again.']);
}
?>
