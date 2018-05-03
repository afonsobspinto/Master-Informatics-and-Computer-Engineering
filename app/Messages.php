<?php
/**
 * Created by IntelliJ IDEA.
 * User: cristiana
 * Date: 03-05-2018
 * Time: 9:19
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Messages extends  Model
{
    protected $table = 'messages';

    public function getSender() {
        $sender = DB::table('emails')
            ->where('id', '=', $this->id)
            ->get('sender_id');

        return $sender;
    }

    public function getReceiver() {
        $receiver = DB::table('emails')
            ->where('id', '=', $this->id)
            ->get('receiver_id');

        return $receiver;
    }

    public function getMessage() {
        $message = DB::table('messages')
            ->where('id', '=', $this->id)
            ->get('message');

        return $message;
    }

    public function getSubject() {
        $subject = DB::table('messages')
            ->where('id', '=', $this->id)
            ->get('subject');

        return $subject;
    }

    public function getDate() {

        $date = DB::table('messages')
            ->where('id', '=', $this->id)
            ->get('send_date');

        return $date;
    }

}