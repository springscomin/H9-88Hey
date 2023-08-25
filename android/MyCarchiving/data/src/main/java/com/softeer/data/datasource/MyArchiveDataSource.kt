package com.softeer.data.datasource

import com.softeer.data.model.CarInfoBody
import com.softeer.data.model.CarTempInfoBody
import com.softeer.data.network.MyArchiveNetworkApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

interface MyArchiveDataSource {

    fun saveTempCarInfo(body: CarTempInfoBody): Flow<Long>

    fun saveCarInfo(body: CarInfoBody): Flow<Long>

    suspend fun deleteMadeCar(feedId: Long): Boolean

}

class MyArchiveRemoteDataSource(
    private val myArchiveNetworkApi: MyArchiveNetworkApi
): MyArchiveDataSource {

    override fun saveTempCarInfo(body: CarTempInfoBody): Flow<Long> = flow {
        val response = myArchiveNetworkApi.saveMyCarTempInfo(body)
        val myArchiveId = response.body()?.data?.myChivingId

        if (response.isSuccessful && myArchiveId != null) {
            emit(myArchiveId)
        } else {
            emit(-1L)
        }
    }

    override fun saveCarInfo(body: CarInfoBody): Flow<Long> = flow {
        val response = myArchiveNetworkApi.saveMyCarInfo(body)
        val myArchiveId = response.body()?.data?.myChivingId

        if (response.isSuccessful && myArchiveId != null) {
            emit(myArchiveId)
        } else {
            emit(-1L)
        }
    }

    override suspend fun deleteMadeCar(feedId: Long): Boolean {
        val response = myArchiveNetworkApi.deleteMadeCarFeed(feedId)
        return response.isSuccessful
    }
}