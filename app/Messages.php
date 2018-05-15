<?php
/**
 * Created by IntelliJ IDEA.
 * User: cristiana
 * Date: 03-05-2018
 * Time: 9:19
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Messages extends  Model
{
    protected $table = 'messages';
    public $timestamps = false;
    protected $fillable = ['subject', 'message', 'send_date'];

    /*
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
    */

    public static function create(array $data) {
        DB::table('messages')->insert(
            $data
        );
    }

    public function getUserMessages(int $id){
        $messages = DB::table('emails')
          ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.sender_id')
            ->select('emails.*', 'messages.*', 'users.username')
            ->where('receiver_id', '=', $id)
            ->get();

        return $messages;
    }

    public function getUserMessageById(int $userId, int $messageId) {
       $message =  DB::table('emails')
           ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.sender_id')
           ->select('emails.*', 'messages.*', 'users.username')
           ->where('receiver_id', '=', $userId)
           ->where('messages.id', '=', $messageId)
           ->first();

       return $message;
    }

    public function getNextMessageID()
    {

        $statement = DB::select("show table status like 'messages'");

        return response()->json(['id' => $statement[0]->Auto_increment]);
    }

}