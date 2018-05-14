<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Messages;
use Auth;


class MessagesController extends Controller
{

    protected $messageService;

    public function __construct(Messages $messages) {
        $this->messageService = $messages;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $userId = Auth::user()->id;
        $categories = Category::all();
       // $messages = $this->messageService->getMessagesId($userId);
        $messages = $this->messageService->getUserMessages(5);

        return view('messages.index', [
            'categories' => $categories,
            'messages' => $messages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $userId = Auth::user()->id;
        $categories = Category::all();
        // $messages = $this->messageService->getMessagesId($userId);
        $messages = $this->messageService->getUserMessages(5);

        return view('messages.create', [
            'categories' => $categories,
            'messages' => $messages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $userId = Auth::user()->id;
        $categories = Category::all();
        $message = $this->messageService->getUserMessageById(5, $id);

        return view('messages.show', [
            'categories' => $categories,
            'message' => $message
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function createSpecificMessage($message){

    }
}
