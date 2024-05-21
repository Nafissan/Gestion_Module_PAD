package sn.pad.pe.dotation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.dotation.bo.Notification;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
    public Notification findByModule(String nomModule);
}
