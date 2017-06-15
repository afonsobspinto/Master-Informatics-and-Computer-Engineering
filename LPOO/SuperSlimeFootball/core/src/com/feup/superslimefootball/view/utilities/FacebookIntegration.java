package com.feup.superslimefootball.view.utilities;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.FacebookType;

/**
 * Created by afonso on 6/11/17.
 */

public class FacebookIntegration {

    private static FacebookIntegration instance;

    private FacebookClient fbClient;

    private final String accessToken = "token goes here";
    private final String appID = "app id goes here ";
    private final String appSecret = "app screte goes here";
    String authUrl;


    private final String winnerMessage = "I'm Amazing in SuperSlimeFootball! Uuhuh";
    private final String loserMessage = "I love SuperSlimeFootball, but I might need some more training! ";

    private FacebookClient.AccessToken extendedAccessToken;


    FacebookIntegration(){

        this.fbClient = new DefaultFacebookClient(accessToken);
        this.extendedAccessToken = fbClient.obtainExtendedAccessToken(appID, appSecret);

        authUrl = "https://graph.facebook.com/oauth/authorize?type=user_agent&client_id="+appID+"&scope=user_about_me,"
                + "user_actions.books,user_actions.fitness,user_actions.music,user_actions.news,user_actions.video,user_activities,user_birthday,user_education_history,"
                + "user_events,user_photos,user_friends,user_games_activity,user_groups,user_hometown,user_interests,user_likes,user_location,user_photos,user_relationship_details,"
                + "user_relationships,user_religion_politics,user_status,user_tagged_places,user_videos,user_website,user_work_history,ads_management,ads_read,email,"
                + "manage_notifications,manage_pages,publish_actions,read_friendlists,read_insights,read_mailbox,read_page_mailboxes,read_stream,rsvp_event";


    }


    public void authenticate(){

    }

    public void publish(boolean winner){
        String message = (winner)? winnerMessage: loserMessage;
        fbClient.publish("me/feed", FacebookType.class, Parameter.with("message", message));
    }

    public static FacebookIntegration getInstance() {
        if(instance == null)
            instance = new FacebookIntegration();

        return instance;
    }
}

