package com.qucat.quiz.services;

import com.qucat.quiz.repositories.entities.Notification;
import com.qucat.quiz.repositories.entities.NotificationType;
import com.qucat.quiz.repositories.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationService {

    @Autowired
    private UserService userService;

    public Notification generateNotification(int authorId, int objectId, NotificationType notificationType) {
        User notificationAuthor = userService.getUserDataById(authorId);
        Notification notification = new Notification();
        notification.setAuthor(notificationAuthor.getLogin());

        switch(notificationType) {
            case CREATED_NEWS:
                notification.setAction("створив новину!");
                notification.setLink("http://localhost:4200/?#/announcement/" + objectId);
                break;
            case CREATED_QUIZ:
                notification.setAction("створив вікторину, поспішай збирати команду!");
                notification.setLink("http://localhost:4200/?#/quiz/" + objectId);
                break;
            case GAME_INVITATION:
                notification.setAction("запрошує Вас у гру, впред за новими рекордами!");
                notification.setLink("http://localhost:4200/?#/quiz/35/game/null/play" + objectId);
                break;
            case FRIEND_INVITATION:
                notification.setAction("запрошує Вас у друзі!");
                notification.setLink("http://localhost:4200/?#/" + objectId);
                break;
        }
        return notification;
    }

}
