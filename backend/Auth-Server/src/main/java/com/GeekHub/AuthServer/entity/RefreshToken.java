package com.GeekHub.AuthServer.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Entity
@Getter
@Table(name = "REFRESH_TOKEN")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REFRESH_TOKEN_ID", nullable = false)
    private Long refreshTokenId;

    @Column(name = "REFRESH_TOKEN", nullable = false)
    private String refreshToken;

    @Column(name = "KEY_Name", nullable = false)
    private String keyName;

}