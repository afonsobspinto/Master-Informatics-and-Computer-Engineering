<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 06-05-2018
 * Time: 19:52
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;


trait ImageFileTraits
{
    protected $image_rule = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'; //max file size needs to be modified in php.ini

    protected $profilesDir = 'images/profiles';

    protected function tryStoreProfilePicture($image, $id) {
        if($image == null)
            return;

        $picDir = $this->profilesDir . '/' . $id;
        Storage::deleteDirectory($picDir);

        $image->store($picDir);
    }


}