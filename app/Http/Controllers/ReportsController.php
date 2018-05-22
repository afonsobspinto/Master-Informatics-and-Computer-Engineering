<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Response;
use App\Category;
use App\Messages;
use Auth;


class ReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        $reports = Report::getReports();
        $rep = Report::getReportsJoin(); //faz join com o user que fez o report //

        return view('reports.index', [
            'categories' => $categories,
            'reports' => $reports,
            'rep' => $rep,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function storeUserReport(Request $request){
        return 123;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'msg' => 'required',
            'sub' => 'required',
        ]);

        try {

            $message = new Messages();
            $message ->subject = $request->input('sub');
            $message ->message = $request->input('msg');
            $message ->send_date = Carbon::now();
            $message ->save();

            // ['id', 'user_id','auction_id', 'is_user'];
            $report = new Report();
            $report->id = $message->id;
            $report->user_id = $request->input('user_id');
            $report->auction_id = $request->input('auction_id');
            $report->is_user = $request->input('is_user');

            $report->save();



        }
        catch (\Exception $e){
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => 'Message send successfully',
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}
