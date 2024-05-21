package sn.pad.pe.dotation.services;

import java.util.List;

import sn.pad.pe.dotation.dto.NotificationDTO;

public interface NotificationService {

    public List<NotificationDTO> getNotifications();

    public NotificationDTO getNotificationById(Long id);

    public NotificationDTO create(NotificationDTO notificationDto);

    public boolean update(NotificationDTO notificationDto);

    public boolean delete(NotificationDTO notificationDto);

}
