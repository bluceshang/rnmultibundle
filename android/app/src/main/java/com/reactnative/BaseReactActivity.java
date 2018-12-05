package com.reactnative;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.reactnative.flow.RNBundleLoaderListener;
import com.reactnative.flow.ReactHosManager;


public class BaseReactActivity extends ReactActivity {
    private static final String RN_KEY_PLUGIN_ID = "rnPluginId";
    private static final String RN_KEY_COMPONENT_NAME = "rnComponentName";
    private static final String RN_DEFAULT_PLUGIN_ID = "business/business.android.bundle";
    private static final String RN_DEFAULT_COMPONENT_NAME = "PersonalPage";

//    private static final String RN_DEFAULT_PLUGIN_ID = "busmul.android.bundle";
//    private static final String RN_DEFAULT_COMPONENT_NAME = "reactnative_multibundler";

    private FlowReactActivityDelegate activityDelegate;

    public static Intent getIntent(Context context, String pluginId, String componentName) {
        Intent intent = new Intent(context, BaseReactActivity.class);
        intent.putExtra(RN_KEY_PLUGIN_ID, pluginId);
        intent.putExtra(RN_KEY_COMPONENT_NAME, componentName);
        return intent;
    }

    private FlowReactNativeHost nativeHost;
    private String pluginId;
    private String componentName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        nativeHost = ReactHosManager.getNativeHost(getApplication(), getPluginId());
        activityDelegate.setReactNativeHost(nativeHost);
        nativeHost.loadBundle(loaderListener);
    }

    private String getRNComponentName() {
        if (TextUtils.isEmpty(componentName)) {
            componentName = getIntent().getStringExtra(RN_KEY_COMPONENT_NAME);
        }
        if (TextUtils.isEmpty(componentName)) {
            return RN_DEFAULT_COMPONENT_NAME;
        }
        return componentName;
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        activityDelegate = new FlowReactActivityDelegate(this, null);
        return activityDelegate;
    }


    public String getPluginId() {
        if (TextUtils.isEmpty(pluginId)) {
            pluginId = getIntent().getStringExtra(RN_KEY_PLUGIN_ID);
        }
        if (TextUtils.isEmpty(pluginId)) {
            return RN_DEFAULT_PLUGIN_ID;
        }
        return pluginId;
    }

    private RNBundleLoaderListener loaderListener = new RNBundleLoaderListener() {
        @Override
        public void onFail(Exception e) {
            e.printStackTrace();
        }

        @Override
        public void onSuccess() {
            loadApp(getRNComponentName());
        }
    };
}
