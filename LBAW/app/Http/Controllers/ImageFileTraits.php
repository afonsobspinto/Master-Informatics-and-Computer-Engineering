<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 06-05-2018
 * Time: 19:52
 */

namespace App\Http\Controllers;
use DeepCopy\f001\A;
use function foo\func;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


trait ImageFileTraits
{
    protected $image_rule = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'; //max file size needs to be modified in php.ini
    private $userPlaceholder = 'images/user-placeholder.png';
    private $profilesDir = 'images/profiles';
    private $auctionPlaceholder = 'images/placeholder.png';

    protected function getUserPlaceholderURL() {
        return url($this->userPlaceholder);
    }

    protected function getAuctionPlaceholderURL() {
        return url($this->auctionPlaceholder);
    }

    private function getUserDir($userID) {
        return $this->profilesDir . '/' . $userID;
    }

    protected function tryStoreProfilePicture($image, $userID) {
        if($image == null)
            return;

        $picDir = $this->getUserDir($userID);
        $this->deleteFolder($picDir);

        $image->store($picDir, 'public');
    }

    protected function getProfilePictureURL($userID) {

        $picDir = 'public/' . $this->getUserDir($userID);

        $files = Storage::files($picDir);
        if(count($files) == 0)
            return $this->getUserPlaceholderURL();
        else {
            return Storage::url($files[0]);
        }
    }

    private function getAuctionDir($auctionID) {
        return 'images/auctions/' . $auctionID;
    }

    private function deleteFolder($folderPath) {
        $path = 'public/' . $folderPath;
        Storage::deleteDirectory($path);
    }

    protected function trySaveAuctionImages($images, $auctionID) {
        if($images == null || count($images) == 0)
            return;

        $picDir = $this->getAuctionDir($auctionID);
        $this->deleteFolder($picDir);

        foreach ($images as $image)
            $image->store($picDir, 'public');
    }

    protected function deleteUserFolder($userID) {
        $picDir = $this->getUserDir($userID);
        $this->deleteFolder($picDir);
    }

    protected function deleteAuctionFolder($auctionID) {
        $picDir = $this->getAuctionDir($auctionID);
        $this->deleteFolder($picDir);
    }

    protected function getAuctionPicturesURLs($auctionID) {
        $picDir = 'public/' . $this->getAuctionDir($auctionID);

        $files = Storage::files($picDir);
        if(count($files) == 0)
            return [$this->getAuctionPlaceholderURL()];
        else {
            $urls = array_map(function ($item) {
                return Storage::url($item);
            }, $files);
            return $urls;
        }
    }

}