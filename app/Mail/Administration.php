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

    }

    private static $ADMIN_NO_REPLY_EMAIL = "dontreply@bidbay";

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(Administration::$ADMIN_NO_REPLY_EMAIL)
            ->view('mail.account-creation')
//            ->with([
//                'user' => $this->user,
//            ])
            ;
    }
}
