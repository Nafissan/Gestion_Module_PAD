package sn.pad.pe.dotation.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.dotation.bo.Notification;
import sn.pad.pe.dotation.dto.NotificationDTO;
import sn.pad.pe.dotation.repositories.NotificationRepository;
import sn.pad.pe.dotation.services.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService{
    
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<NotificationDTO> getNotifications() {
        List<NotificationDTO> typeNotificationDtos;
            typeNotificationDtos = notificationRepository.findAll().stream()
                   .map(typeNotification -> modelMapper.map(typeNotification, NotificationDTO.class)).collect(Collectors.toList());
        return typeNotificationDtos;
    }

    @Override
    public NotificationDTO getNotificationById(Long id) {
        Optional<Notification> typeNotification = notificationRepository.findById(id);
        if ( typeNotification.isPresent()) {
            return modelMapper.map( typeNotification.get(), NotificationDTO.class);
        } else {
            throw new ResourceNotFoundException("Dotation not found with id : " + id);
        }
    }

    @Override
    public NotificationDTO create(NotificationDTO notificationDto) {
        Notification notificationSaved = modelMapper.map(notificationDto, Notification.class);
        return modelMapper.map(notificationRepository.save(notificationSaved), NotificationDTO.class);
        
    }

    @Override
    public boolean update(NotificationDTO notificationDto) {
        Optional<Notification> notificationUpdate = notificationRepository.findById(notificationDto.getId());
        boolean isDeleleted = false;
        if (notificationUpdate.isPresent()) {
            notificationRepository.save(modelMapper.map(notificationDto, Notification.class));
            isDeleleted = true;
        }
        return isDeleleted;
      
    }

    @Override
    public boolean delete(NotificationDTO notificationDto) {
        Optional<Notification> notificationUpdate = notificationRepository.findById(notificationDto.getId());
        boolean isDeleted = false;
        if (notificationUpdate.isPresent()) {
            notificationRepository.delete(notificationUpdate.get());
            isDeleted = true;
        }
        return isDeleted;
    }

   
    

}
