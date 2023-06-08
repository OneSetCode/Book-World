package com.onesetcode.springbootlibrary.entity;

import lombok.Data; // Help realize and reduce the GET and SET functions '@Data'
import javax.persistence.*; // JPA '@Entity @Table'

// You use JPA for the database and a REST api for the frontend (or any other applications).

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copiesAvailable;

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;
}
