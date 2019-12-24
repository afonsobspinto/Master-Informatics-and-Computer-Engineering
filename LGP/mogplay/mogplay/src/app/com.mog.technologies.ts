import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.mog.technologies{
   export class Video extends Asset {
      videoID: string;
      owner: User;
   }
   export class User extends Participant {
      userID: string;
   }
   export class Purchase extends Transaction {
      video: Video;
      newOwner: User;
   }
// }
