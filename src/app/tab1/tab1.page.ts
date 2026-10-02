import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, Platform } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})

export class Tab1Page implements OnInit {

  private device = inject(Device);
  private platform = inject(Platform);
  private cdr = inject(ChangeDetectorRef);

  deviceModel = 'Unavailable';
  devicePlatform = 'Unavailable';
  deviceVersion = 'Unavailable';

  async ngOnInit() {
    await this.platform.ready();
    await this.loadTasks();

    try {
      this.deviceModel = this.device.model || 'Unavailable';
      this.devicePlatform = this.device.platform || 'Unavailable';
      this.deviceVersion = this.device.version || 'Unavailable';

      console.log('Device Model:', this.device.model);
      console.log('Device Platform:', this.device.platform);
      console.log('Device Version:', this.device.version);
    } catch (error) {
      console.error('Device plugin error:', error);
    }
  }

  tasks: any[] = [];

  async loadTasks() {
    const querySnapshot = await getDocs(collection(db, 'tasks'));

    this.tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Firebase Tasks:', this.tasks);

    this.cdr.detectChanges();
  }

  async addTask(taskName: string, category: string, dueDate: string) {
    if(!taskName || !category || !dueDate){
      return;
    }

    await addDoc(collection(db, 'tasks'),{
      taskName: taskName,
      category: category,
      description: 'Study task created in CyberTrack',
      dueDate: dueDate,
      studyTime: 60,
      completionStatus: 'Not Started',
      reminderEnabled: false
    });

    await this.loadTasks();
  }
  async completeTask(taskId: string) {
    const taskRef = doc(db, 'tasks', taskId);

    await updateDoc(taskRef, {
      completionStatus: 'Completed'
    });

    await this.loadTasks();
  }
}