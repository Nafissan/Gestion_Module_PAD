package sn.pad.pe.dotation.controllers;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sn.pad.pe.configurations.exception.Message;
import sn.pad.pe.dotation.dto.NotificationDTO;
import sn.pad.pe.dotation.services.NotificationService;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    private Message message;

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotifications() {
        List<NotificationDTO> notificationDTOs = notificationService.getNotifications();
        return new ResponseEntity<List<NotificationDTO>>(notificationDTOs, HttpStatus.OK);
    }

    @GetMapping("/notifications/{id}")

    public ResponseEntity<?> getDotationById(@PathVariable(value = "id") long id) {
        NotificationDTO notificationDto = notificationService.getNotificationById(id);
        return new ResponseEntity<NotificationDTO>(notificationDto, HttpStatus.FOUND);
    }

    @PostMapping("/notifications")
    public ResponseEntity<?> create(@RequestBody @Valid NotificationDTO notificationDto) {
        return new ResponseEntity<NotificationDTO>(notificationService.create(notificationDto), HttpStatus.CREATED);
    }

    @PutMapping("/notifications")
    public ResponseEntity<?> update(@RequestBody @Valid NotificationDTO notificationUpdated) {
        if (notificationService.update(notificationUpdated)) {
            message = new Message(new Date(), "NotificationDTO with id " + notificationUpdated.getId() + " updated.",
                    "uri=/notifications/"+notificationUpdated.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "NotificationDTO with id " + notificationUpdated.getId() + " not found.",
                "uri=/notifications/"+notificationUpdated.getId());
        return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/notifications")
    public ResponseEntity<?> delete(@RequestBody NotificationDTO notificationDeleted) {
        if (notificationService.delete(notificationDeleted)) {
            message = new Message(new Date(), "NotificationDTO with id " + notificationDeleted.getId() + " deleted.",
                    "uri=/notifications/"+notificationDeleted.getId());
            return ResponseEntity.ok().body(message);
        }
        message = new Message(new Date(), "NotificationDTO with id " + notificationDeleted.getId() + " not found.",
                "uri=/notifications/"+notificationDeleted.getId());
        return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);

    }
}
