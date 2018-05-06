<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 06-05-2018
 * Time: 19:52
 */

namespace App\Http\Controllers;
use DeepCopy\f001\A;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


trait ImageFileTraits
{
    protected $image_rule = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'; //max file size needs to be modified in php.ini
    private $userPlaceholder = 'images/user-placeholder.png';
    private $profilesDir = 'images/profiles';

    protected function getUserPlaceholderURL() {
        return url($this->userPlaceholder);
    }

    private function getUserDir($id) {
        return $this->profilesDir . '/' . $id;
    }

    protected function tryStoreProfilePicture($image, $id) {
        if($image == null)
            return;

        $picDir = $this->getUserDir($id);
        Storage::deleteDirectory($picDir);

        $image->store($picDir, 'public');
    }

    protected function getProfilePictureURL() {
        if(! Auth::check())
            return null;

        $id = Auth::id();
        $picDir = 'public/' . $this->getUserDir($id);

        $files = Storage::files($picDir);
        if(count($files) == 0)
            return $this->getUserPlaceholderURL();
        else {
            return Storage::url($files[0]);
        }
    }

}