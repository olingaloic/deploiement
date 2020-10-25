package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

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