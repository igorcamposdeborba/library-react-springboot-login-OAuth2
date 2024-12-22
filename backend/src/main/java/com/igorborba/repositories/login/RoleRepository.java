package com.igorborba.repositories.login;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igorborba.entities.login.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByAuthority(String authority);
}
