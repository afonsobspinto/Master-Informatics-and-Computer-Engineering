<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Administration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->adminEmail = env("MAIL_USERNAME");

        if(!$this->adminEmail)
            throw new \Exception("System email not configure");
    }

    private $adminEmail;

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->adminEmail)
            ->view('mail.account-creation')
            ->subject('Email Confirmation');
    }
}
