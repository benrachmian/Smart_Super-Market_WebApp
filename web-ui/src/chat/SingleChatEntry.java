package chat;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class SingleChatEntry {
    private final String chatString;
    private final String username;
    private final String time;

    public SingleChatEntry(String chatString, String username) {
        this.chatString = chatString;
        this.username = username;
        this.time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
    }

    public String getChatString() {
        return chatString;
    }

    public String getTime() {
        return time;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return (username != null ? username + ": " : "") + chatString;
    }
}

