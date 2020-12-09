package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.model.User;
import com.equipe1.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.doReturn;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private User user;

    @BeforeEach
    public void setUp() {
        user = new Etudiant();
        user.setId(1L);
        user.setEmail("etudiant@email.com");
        user.setPassword("12345");
    }

    @Test
    void getAllUsers() {
        // Arrange
        doReturn(Arrays.asList(user)).when(userRepository).findAll();
        // Act
        List<User> users = userService.getAllUsers();
        // Assert
        Assertions.assertEquals(1, users.size());
    }

    @Test
    void getUser() {
        // Arrange
        doReturn(Optional.of(user)).when(userRepository).findByEmail(user.getEmail());
        // Act
        User etudiant = userService.getUser(user.getEmail(), user.getPassword());
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertSame(user, etudiant);
    }

    @Test
    void getUserByEmail() {
        // Arrange
        doReturn(Optional.of(user)).when(userRepository).findByEmail(user.getEmail());
        // Act
        User etudiant = userService.getUserByEmail(user.getEmail());
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertSame(user, etudiant);
    }
}