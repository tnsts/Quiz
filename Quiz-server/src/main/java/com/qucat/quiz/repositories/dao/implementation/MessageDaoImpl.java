package com.qucat.quiz.repositories.dao.implementation;

import com.qucat.quiz.repositories.dao.MessageDao;
import com.qucat.quiz.repositories.dao.mappers.MessageMapper;
import com.qucat.quiz.repositories.entities.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
@PropertySource("classpath:chat.properties")
public class MessageDaoImpl extends GenericDaoImpl<Message> implements MessageDao {

    @Value("#{${sql.message}}")
    private Map<String, String> messageQueries;

    protected MessageDaoImpl() {
        super(new MessageMapper(), TABLE_NAME);
    }

    @Override
    public List<Message> getMessagesFromChat(int chatId) {
        return jdbcTemplate.query(messageQueries.get("getMessagesFromChat"),new Object[]{chatId}, new MessageMapper());
    }

    @Override
    protected String getInsertQuery() {
        return messageQueries.get("insert");
    }

    @Override
    protected PreparedStatement getInsertPreparedStatement(PreparedStatement preparedStatement, Message message) throws SQLException {
        preparedStatement.setInt(1, message.getChatId());
        preparedStatement.setInt(2, message.getAuthorId());
        preparedStatement.setString(3, message.getMessageText());
        return null;
    }

    @Override
    protected String getUpdateQuery() {
        return messageQueries.get("update");
    }

    @Override
    protected Object[] getUpdateParameters(Message message) {
        return new Object[]{message.getChatId(), message.getAuthorId(), message.getMessageText()};
    }
}