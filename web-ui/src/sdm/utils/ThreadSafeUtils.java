package sdm.utils;

public class ThreadSafeUtils {
    public static final Object AccountMovementsLock = new Object();
    public static final Object feedbacksLock = new Object();
    public static final Object chatLock = new Object();
    public static final Object zoneLock = new Object();
    public static final Object storeLock = new Object();

}
