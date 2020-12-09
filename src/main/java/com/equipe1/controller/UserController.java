package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Rappel;
import com.equipe1.model.User;
import com.equipe1.repository.UserRepository;
import com.equipe1.service.RappelService;
import org.springframework.beans.factory.annotation.Autowired;
import com.equipe1.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private RappelService rappelService;

    @GetMapping("findAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get/one/{id}")
    public User getOne(@PathVariable long id) {
        return userService.getById(id);
    }

    @GetMapping("/get/{email}/{password}")
    public User getUser(@PathVariable String email, @PathVariable String password) {
        return userService.getUser(email, password);
    }

    @GetMapping("/get/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/reminders/{userId}")
    public List<? extends Rappel> getRappelsPour(@PathVariable long userId) throws Exception {
        return rappelService.getRappelsPour(userId);
    }
}
