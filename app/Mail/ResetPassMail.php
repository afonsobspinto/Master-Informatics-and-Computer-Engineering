<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassMail extends Mailable
{
    use Queueable, SerializesModels;
    private $adminEmail;
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
        $this->adminEmail = env("MAIL_USERNAME");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from($this->adminEmail)
            ->subject("BidBay: Reset Password")
            ->view('mail.reset_password');
    }
}
