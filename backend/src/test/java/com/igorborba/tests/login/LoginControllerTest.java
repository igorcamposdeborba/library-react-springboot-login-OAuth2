package com.igorborba.tests.login;


import com.igorborba.controllers.login.LoginController;
import com.igorborba.dto.login.RoleDTO;
import com.igorborba.dto.login.SignupResponseDTO;
import com.igorborba.dto.login.UserDTO;
import com.igorborba.entities.login.Role;
import com.igorborba.entities.login.User;
import com.igorborba.repositories.login.RoleRepository;
import com.igorborba.repositories.login.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {

    @InjectMocks
    private LoginController loginController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @BeforeEach
    public void setUp() {
        // Configurações iniciais, se necessário
    }

    @Test
    public void testSignup_Success() {
        // Preparar dados para o teste
        UserDTO userDTO = new UserDTO(1L, "John", "Doe", "john.doe@example.com", "password123", Set.of(new RoleDTO(1L, "ROLE_ADMIN")));

        // Simular que o usuário ainda não existe no banco
        Mockito.when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(null);

        // Simular que a role ADMIN existe
        Role adminRole = new Role();
        adminRole.setAuthority("ROLE_ADMIN");
        Mockito.when(roleRepository.findByAuthority("ROLE_ADMIN")).thenReturn(adminRole);

        // Executar o método
        ResponseEntity<SignupResponseDTO> response = loginController.signup(userDTO);

        // Verificar se o usuário foi criado e a resposta está correta
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals("Usuário cadastrado com sucesso.", response.getBody().getMessage());
    }

    @Test
    public void testSignup_UserAlreadyExists() {
        // Preparar dados para o teste
        UserDTO userDTO = new UserDTO(1L, "John", "Doe", "john.doe@example.com", "password123", Set.of(new RoleDTO(1L, "ROLE_ADMIN")));

        // Simular que o usuário já existe no banco
        User existingUser = new User();
        existingUser.setEmail(userDTO.getEmail());
        Mockito.when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(existingUser);

        // Executar o método
        ResponseEntity<SignupResponseDTO> response = loginController.signup(userDTO);

        // Verificar se o erro foi retornado
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals("Usuário já cadastrado para este e-mail.", response.getBody().getMessage());
    }
}


