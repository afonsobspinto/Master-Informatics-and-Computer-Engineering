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


    public static function create(array $data) {
        DB::table('messages')->insert(
            $data
        );
    }

    public static function getUserMessages(int $id){
        $messages = DB::table('emails')
          ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.sender_id')
            ->select('emails.*', 'messages.*', 'users.username')
            ->where('receiver_id', '=', $id)
            ->orderByRaw('send_date DESC')
            ->get();

        return $messages;
    }

    public static function getUserMessagesPaginate(int $id){
        $messages = DB::table('emails')
            ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.sender_id')
            ->select('emails.*', 'messages.*', 'users.username')
            ->where('receiver_id', '=', $id)
            ->orderByRaw('send_date DESC')
            ->paginate(10);

        return $messages;
    }

    public static function getUserSentMessagesPaginate(int $id){
        $messages = DB::table('emails')
            ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.receiver_id')
            ->select('emails.*', 'messages.*', 'users.username')
            ->where('sender_id', '=', $id)
            ->orderByRaw('send_date DESC')
            ->paginate(10);

        return $messages;
    }

    public function getUserMessageById(int $userId, int $messageId) {
       $message =  DB::table('emails')
           ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.sender_id')
           ->select('emails.*', 'messages.*', 'users.*')
           ->where('receiver_id', '=', $userId)
           ->where('messages.id', '=', $messageId)
           ->first();

       return $message;
    }

    public function getUserSentMessageById(int $userId, int $messageId) {
        $message =  DB::table('emails')
            ->join('messages', 'messages.id', '=', 'emails.id')
            ->join('users', 'users.id', '=', 'emails.receiver_id')
            ->select('emails.*', 'messages.*', 'users.*')
            ->where('sender_id', '=', $userId)
            ->where('messages.id', '=', $messageId)
            ->first();

        return $message;
    }

    public function getMessageReceiverId(string $username) {
        $user = DB::table('users')->where('username', $username)->first();

        return $user;
    }

    public function getuser(string $id) {
        $user = DB::table('users')->where('id', $id)->first();
        return $user;
    }

    public function updateMessageHasBeenOpened(int $messageId) {
        DB::table('emails')
            ->where('id', $messageId)
            ->update(['has_been_opened' => true]);
    }

    public static function countUnreadMessages($userId){
        $count = DB::table('emails')
            ->where('has_been_opened', false)
            ->where('receiver_id', $userId)
            ->count();

        return $count;
    }

}