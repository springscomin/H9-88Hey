package com.softeer.mycarchiving.ui.myarchive

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavOptions
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.softeer.mycarchiving.navigation.MainDestination
import com.softeer.mycarchiving.navigation.MyArchiveDestinations.*
import com.softeer.mycarchiving.ui.HyundaiAppState
import com.softeer.mycarchiving.ui.component.MyArchiveNavigateBar
import com.softeer.mycarchiving.ui.myarchive.detail.myArchiveDetailScreen
import com.softeer.mycarchiving.ui.myarchive.main.myArchiveMainScreen

fun NavController.navigateToMyArchiving(navOptions: NavOptions? = null) {
    navigate(MainDestination.MY_ARCHIVING.route, navOptions)
}

fun NavGraphBuilder.makingMyArchiveGraph(
    appState: HyundaiAppState
) {
    composable(
        route = MainDestination.MY_ARCHIVING.route
    ) {
        appState.myArchiveNavController = rememberNavController()

        Scaffold(
            modifier = Modifier,
            topBar = {
                MyArchiveNavigateBar(
                    onStartAreaClick = if (appState.currentMyArchiveDestinations == MY_ARCHIVE_MAIN) {
                        { appState.navController.popBackStack() }
                    } else {
                        { appState.makingCarNavController.popBackStack() }
                    }
                )
            },
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
            ) {
                NavHost(
                    navController = appState.myArchiveNavController,
                    startDestination = MY_ARCHIVE_MAIN.route
                ) {
                    myArchiveMainScreen(
                        moveDetailPage = appState::navigateToMyArchiveDestination,
                        onBackClick = appState.navController::popBackStack
                    )
                    myArchiveDetailScreen(
                        onBackClick = appState.myArchiveNavController::popBackStack
                    )
                }
            }
        }
    }
}