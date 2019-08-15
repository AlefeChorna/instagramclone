import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import LazyImage from '../../components/LazyImage';

import { 
  Post, 
  Header, 
  Avatar, 
  Name,
  Description,
  Loading 
} from './styles';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(_prPageNumber = page, _prShouldRefresh = false) {
    if (total && _prPageNumber > total) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${_prPageNumber}`
    );

    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setFeed(_prShouldRefresh ? data : [...feed, ...data]);
    setTotal(Math.floor(totalItems / 5));
    setPage(_prPageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        overScrollMode="never"
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.2}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 25
        }}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              shouldLoad={viewable.includes(item.id)} 
              aspectRatio={item.aspectRatio}
              smallSource={{ uri: item.small }} 
              source={{ uri: item.image }} />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )} />
    </View>
  );
}
