package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "height")
    private Float height;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "workout_frequency")
    private Integer workoutFrequency;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Lob
    @Column(name = "avatar",length = 500000)
    private Byte[] avatar;

    @ManyToMany(fetch = FetchType.EAGER, cascade =
            {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<RoleEntity> roles;


    @ManyToMany(fetch = FetchType.LAZY,cascade =
            {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "user_ingredient",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<IngredientEntity> ingredients;



    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "coach_id")
    private UserEntity coach;

    @OneToMany(mappedBy = "coach")
    private List<UserEntity> userSubscribes;

    @OneToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH},mappedBy = "user")
    private List<PostEntity> posts;

    @OneToOne
    @JoinColumn(name = "calendar_id")
    private CalendarEntity calendar;

    public void addIngredient(IngredientEntity ingredient){
        if (ingredients==null){
            ingredients = new ArrayList<>();
        }

        ingredients.add(ingredient);
    }

    public void addRole(RoleEntity role){
        if (roles==null){
            roles = new ArrayList<>();
        }
        roles.add(role);
    }

    public void addPost(PostEntity postEntity){
        if (posts==null){
            posts = new ArrayList<>();
        }
        posts.add(postEntity);
    }
}
