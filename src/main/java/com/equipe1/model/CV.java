package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CV {

    @Id
    private Long id;

    private String name;

    private CVStatus status;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] data;

    public enum CVStatus {
        APPROVED, DENIED, UNREVIEWED
    }
}