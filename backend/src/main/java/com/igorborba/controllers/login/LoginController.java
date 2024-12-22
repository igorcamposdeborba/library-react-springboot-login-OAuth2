package com.igorborba.controllers.login;

import com.igorborba.dto.login.SignupResponseDTO;
import com.igorborba.dto.login.UserDTO;
import com.igorborba.entities.login.Role;
import com.igorborba.entities.login.User;
import com.igorborba.repositories.login.RoleRepository;
import com.igorborba.repositories.login.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", exposedHeaders = "Authorization")
public class LoginController {
	
private final RestTemplate restTemplate = new RestTemplate();
    
	@Value("${security.oauth2.client.client-id}")
    private String clientId;

	@Value("${security.oauth2.client.client-secret}")
    private String clientSecret;

    @Value("${security.oauth2.client.access-token-uri}")
    private String tokenUrl;
    
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Cadastro personalizado de usuário: endpoint para exposição. O login signin (oauth/token do token JWT) ta em AuthorizationServerConfig e ResourceServerConfig
    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDTO> signup(@Valid @RequestBody UserDTO userDTO) {
        // Verificar se o e-mail já está cadastrado
        User existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (Objects.nonNull(existingUser)) {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SignupResponseDTO("Usuário já cadastrado para este e-mail.", null));
        }

        // Criar novo usuário
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        
        // Criptografar a senha antes de salvar
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Atribuir o acesso de ADMIN por padrão
        Role adminRole = roleRepository.findByAuthority("ROLE_ADMIN");
        Optional<Role> roleItem = user.getRoles().stream().filter(role -> role.getAuthority().equalsIgnoreCase("ROLE_ADMIN")).findAny();
        if (Objects.nonNull(adminRole) && roleItem.isEmpty()) {
        	user.setRoles(Stream.of(adminRole).collect(Collectors.toSet()));
        }

        // Salvar no banco de dados
        userRepository.save(user);

        SignupResponseDTO response = new SignupResponseDTO("Usuário cadastrado com sucesso.", user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(response);
    }
}
