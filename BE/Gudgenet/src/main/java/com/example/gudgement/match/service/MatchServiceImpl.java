package com.example.gudgement.match.service;

import com.example.gudgement.match.common.config.JacksonConfig;
import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.match.event.MatchRequestEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ApplicationEventPublisher eventPublisher;


    public void addUserToGroup(MatchDto matchDto) {
        String key = "Room:" + matchDto.getTiggle() + ":" + matchDto.getRoleUser();
        redisTemplate.opsForSet().add(key, matchDto.getNickName());

        eventPublisher.publishEvent(new MatchRequestEvent(this, matchDto));
    }

    public void removeUserFromGroup(MatchDto matchDto) {
        String key = "Room:" + matchDto.getTiggle() + ":" + matchDto.getRoleUser();
        redisTemplate.opsForSet().remove(key, matchDto.getNickName());
    }
}