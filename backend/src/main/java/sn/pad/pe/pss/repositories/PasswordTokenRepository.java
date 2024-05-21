package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.PasswordResetToken;

public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

}
