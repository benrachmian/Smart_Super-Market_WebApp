package feedback;

import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;

public class Feedback {
    private static final int MIN_RANK = 1;
    private static final int MAX_RANK = 5;
    private float rank;
    private String comment;
    private final String feedbackGiver;
    private final int storeGotFeedbackId;

    public Feedback(float rank, String comment, String feedbackGiver, int storeGotFeedbackId) {
        this.rank = rank;
        this.comment = comment;
        this.feedbackGiver = feedbackGiver;
        this.storeGotFeedbackId = storeGotFeedbackId;
    }

    public float getRank() {
        return rank;
    }

    public String getComment() {
        return comment;
    }

    public String getFeedbackGiver() {
        return feedbackGiver;
    }

    public int getStoreGotFeedbackId() {
        return storeGotFeedbackId;
    }
}
